package com.mvfinds.controller;

import com.mvfinds.dto.ProductDto;
import com.mvfinds.dto.UploadResponse;
import com.mvfinds.entity.Product;
import com.mvfinds.exception.ResourceNotFoundException;
import com.mvfinds.repository.ProductRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    private final ProductRepository productRepository;

    @Value("${app.upload.dir:../public/products}")
    private String uploadDir;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    /**
     * GET /api/products — Returns all products
     */
    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAllByOrderByCreatedAtDesc();
    }

    /**
     * GET /api/products/featured — Returns featured products for homepage
     */
    @GetMapping("/featured")
    public List<Product> getFeaturedProducts() {
        return productRepository.findByFeaturedTrueOrderByCreatedAtDesc();
    }

    /**
     * GET /api/products/{id} — Returns a single product by numeric ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
        return ResponseEntity.ok(product);
    }

    /**
     * GET /api/products/slug/{slug} — Returns product by unique URL slug
     */
    @GetMapping("/slug/{slug}")
    public ResponseEntity<Product> getProductBySlug(@PathVariable String slug) {
        Product product = productRepository.findBySlug(slug)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with slug: " + slug));
        return ResponseEntity.ok(product);
    }

    /**
     * GET /api/products/category/{category} — Returns products in a category
     */
    @GetMapping("/category/{category}")
    public List<Product> getProductsByCategory(@PathVariable String category) {
        // Normalizes slugs like "study-desk-finds" or "Study & Desk"
        String mappedCategory = mapCategoryParam(category);
        return productRepository.findByCategoryIgnoreCase(mappedCategory);
    }

    /**
     * GET /api/products/search?q=... — Search by name, category, description, retailer
     */
    @GetMapping("/search")
    public List<Product> searchProducts(@RequestParam(value = "q", defaultValue = "") String query) {
        String clean = query.trim();
        if (clean.isEmpty()) {
            return List.of();
        }
        return productRepository.searchProducts(clean);
    }

    /**
     * POST /api/products — Creates a new product
     */
    @PostMapping
    public ResponseEntity<Product> createProduct(@Valid @RequestBody ProductDto dto) {
        String slug = dto.getSlug();
        if (slug == null || slug.trim().isEmpty()) {
            slug = generateSlug(dto.getName());
        } else {
            slug = sanitizeSlug(slug);
        }

        // Ensure unique slug
        slug = resolveUniqueSlug(slug, null);

        Product product = new Product();
        mapDtoToEntity(dto, product);
        product.setSlug(slug);

        Product saved = productRepository.save(product);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    /**
     * PUT /api/products/{id} — Updates an existing product
     */
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @Valid @RequestBody ProductDto dto) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));

        String slug = dto.getSlug();
        if (slug == null || slug.trim().isEmpty()) {
            slug = generateSlug(dto.getName());
        } else {
            slug = sanitizeSlug(slug);
        }

        // Ensure unique slug (excluding current product)
        slug = resolveUniqueSlug(slug, id);

        mapDtoToEntity(dto, product);
        product.setSlug(slug);

        Product updated = productRepository.save(product);
        return ResponseEntity.ok(updated);
    }

    /**
     * DELETE /api/products/{id} — Deletes a product
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        if (!productRepository.existsById(id)) {
            throw new ResourceNotFoundException("Product not found with id: " + id);
        }
        productRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * POST /api/products/upload-image — Uploads an image file to local public/products folder
     */
    @PostMapping("/upload-image")
    public ResponseEntity<UploadResponse> uploadImage(
            @RequestParam("file") MultipartFile file,
            @RequestParam(value = "slug", required = false) String slug
    ) throws IOException {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("Cannot upload an empty file.");
        }

        String originalFilename = file.getOriginalFilename();
        String extension = "jpg";
        if (originalFilename != null && originalFilename.contains(".")) {
            extension = originalFilename.substring(originalFilename.lastIndexOf(".") + 1).toLowerCase();
        }

        String baseName = (slug != null && !slug.trim().isEmpty())
                ? sanitizeSlug(slug)
                : "product-" + System.currentTimeMillis();

        String targetFilename = baseName + "." + extension;

        Path targetDirectory = Paths.get(uploadDir).toAbsolutePath().normalize();
        if (!Files.exists(targetDirectory)) {
            Files.createDirectories(targetDirectory);
        }

        Path targetLocation = targetDirectory.resolve(targetFilename);
        Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

        String clientImageUrl = "/products/" + targetFilename;
        return ResponseEntity.ok(new UploadResponse(clientImageUrl, targetFilename));
    }

    // ─────────────────────────────────────────────────────────────────────────────
    // Internal Helper Methods
    // ─────────────────────────────────────────────────────────────────────────────

    private void mapDtoToEntity(ProductDto dto, Product product) {
        product.setName(dto.getName().trim());
        product.setCategory(dto.getCategory().trim());
        product.setDescription(dto.getDescription().trim());
        product.setWhyWePickedIt(dto.getWhyWePickedIt() != null ? dto.getWhyWePickedIt().trim() : "");
        product.setImageUrl(dto.getImageUrl().trim());
        product.setProductUrl(dto.getProductUrl().trim());
        product.setRetailer(dto.getRetailer().trim());
        product.setPrice(dto.getPrice() != null ? dto.getPrice().trim() : "");
        product.setRating(dto.getRating());
        product.setBestFor(dto.getBestFor() != null ? dto.getBestFor().trim() : "");
        product.setFeatured(dto.getFeatured() != null ? dto.getFeatured() : false);
    }

    private String sanitizeSlug(String input) {
        return input.toLowerCase().trim()
                .replaceAll("[^a-z0-9-]", "-")
                .replaceAll("-+", "-")
                .replaceAll("^-|-$", "");
    }

    private String generateSlug(String name) {
        String base = sanitizeSlug(name);
        return base.isEmpty() ? "product" : base;
    }

    private String resolveUniqueSlug(String baseSlug, Long excludeId) {
        String candidate = baseSlug;
        int counter = 2;

        while (true) {
            boolean exists = (excludeId == null)
                    ? productRepository.existsBySlug(candidate)
                    : productRepository.existsBySlugAndIdNot(candidate, excludeId);

            if (!exists) {
                return candidate;
            }
            candidate = baseSlug + "-" + counter;
            counter++;
        }
    }

    private String mapCategoryParam(String param) {
        String lower = param.toLowerCase().replace("-", " ").replace("finds", "").trim();
        if (lower.contains("home")) return "Home Finds";
        if (lower.contains("style")) return "Style Finds";
        if (lower.contains("tech")) return "Tech Finds";
        if (lower.contains("study") || lower.contains("desk")) return "Study & Desk";
        if (lower.contains("gift")) return "Gift Ideas";
        return param;
    }
}
