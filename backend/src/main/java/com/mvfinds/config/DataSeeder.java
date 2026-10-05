package com.mvfinds.config;

import com.mvfinds.entity.Product;
import com.mvfinds.repository.ProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class DataSeeder {

    private static final Logger log = LoggerFactory.getLogger(DataSeeder.class);

    @Bean
    public CommandLineRunner seedDatabase(ProductRepository productRepository) {
        return args -> {
            if (productRepository.count() == 0) {
                log.info("Database is empty. Seeding initial demonstration products...");

                Product lamp = new Product(
                        "Minimal Desk Lamp",
                        "minimal-desk-lamp",
                        "Study & Desk",
                        "A simple desk lamp designed for compact study spaces.",
                        "A clean design that works well on a focused study desk.",
                        "/products/minimal-desk-lamp.jpg",
                        "https://www.amazon.in/dp/B08N5WRWNW",
                        "Amazon",
                        "",
                        null,
                        "Students and compact desks",
                        true
                );

                Product mouse = new Product(
                        "Wireless Mouse",
                        "wireless-mouse",
                        "Tech Finds",
                        "A comfortable wireless mouse for everyday laptop and desk use.",
                        "A simple option for people who want a cleaner wireless desk setup.",
                        "/products/wireless-mouse.jpg",
                        "https://www.amazon.in/dp/B07S92QNYC",
                        "Amazon",
                        "",
                        null,
                        "Students and everyday laptop users",
                        true
                );

                Product stand = new Product(
                        "Laptop Stand",
                        "laptop-stand",
                        "Study & Desk",
                        "An ergonomic adjustable folding stand that elevates laptops for better study posture.",
                        "Sturdy aluminum build that dissipates heat and folds flat for easy backpack transport.",
                        "/products/laptop-stand.jpg",
                        "https://www.amazon.in/dp/B089K8XW1V",
                        "Amazon",
                        "",
                        null,
                        "Students and everyday laptop users",
                        true
                );

                productRepository.saveAll(List.of(lamp, mouse, stand));
                log.info("Successfully seeded 3 demonstration products into PostgreSQL.");
            } else {
                log.info("Database already contains {} products. Skipping seed.", productRepository.count());
            }
        };
    }
}
