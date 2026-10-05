package com.mvfinds.dto;

public class UploadResponse {
    private String imageUrl;
    private String filename;

    public UploadResponse() {
    }

    public UploadResponse(String imageUrl, String filename) {
        this.imageUrl = imageUrl;
        this.filename = filename;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }
}
