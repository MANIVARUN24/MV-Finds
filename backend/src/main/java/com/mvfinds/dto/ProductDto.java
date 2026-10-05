package com.mvfinds.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class ProductDto {

    private Long id;

    @NotBlank(message = "Product name is required.")
    private String name;

    private String slug;

    @NotBlank(message = "Category is required.")
    private String category;

    @NotBlank(message = "Product description is required.")
    private String description;

    private String whyWePickedIt;

    @NotBlank(message = "Product image URL is required.")
    private String imageUrl;

    @NotBlank(message = "Product retailer URL is required.")
    @Pattern(regexp = "^https://.*", message = "Product URL must begin with https://")
    private String productUrl;

    @NotBlank(message = "Retailer is required.")
    private String retailer;

    private String price;

    @DecimalMin(value = "1.0", message = "Rating must be at least 1.0")
    @DecimalMax(value = "5.0", message = "Rating cannot exceed 5.0")
    private Double rating;

    private String bestFor;

    private Boolean featured;

    public ProductDto() {
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
}
