package com.mvfinds.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 255)
    private String name;

    @Column(nullable = false, unique = true, length = 255)
    private String slug;

    @Column(nullable = false, length = 100)
    private String category;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "why_we_picked_it", columnDefinition = "TEXT")
    private String whyWePickedIt;

    @Column(name = "image_url", nullable = false, length = 500)
    private String imageUrl;

    @Column(name = "product_url", nullable = false, columnDefinition = "TEXT")
    private String productUrl;

    @Column(nullable = false, length = 100)
    private String retailer;

    @Column(length = 50)
    private String price;

    @Column
    private Double rating;

    @Column(name = "best_for", columnDefinition = "TEXT")
    private String bestFor;

    @Column(nullable = false)
    private Boolean featured = false;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    public Product() {
    }

    public Product(String name, String slug, String category, String description,
                   String whyWePickedIt, String imageUrl, String productUrl,
                   String retailer, String price, Double rating, String bestFor, Boolean featured) {
        this.name = name;
        this.slug = slug;
        this.category = category;
        this.description = description;
        this.whyWePickedIt = whyWePickedIt;
        this.imageUrl = imageUrl;
        this.productUrl = productUrl;
        this.retailer = retailer;
        this.price = price;
        this.rating = rating;
        this.bestFor = bestFor;
        this.featured = featured != null ? featured : false;
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        if (this.featured == null) {
            this.featured = false;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getWhyWePickedIt() {
        return whyWePickedIt;
    }

    public void setWhyWePickedIt(String whyWePickedIt) {
        this.whyWePickedIt = whyWePickedIt;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getProductUrl() {
        return productUrl;
    }

    public void setProductUrl(String productUrl) {
        this.productUrl = productUrl;
    }

    public String getRetailer() {
        return retailer;
    }

    public void setRetailer(String retailer) {
        this.retailer = retailer;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public String getBestFor() {
        return bestFor;
    }

    public void setBestFor(String bestFor) {
        this.bestFor = bestFor;
    }

    public Boolean getFeatured() {
        return featured;
    }

    public void setFeatured(Boolean featured) {
        this.featured = featured;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
