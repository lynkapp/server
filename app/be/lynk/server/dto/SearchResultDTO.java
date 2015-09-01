package be.lynk.server.dto;

import be.lynk.server.dto.technical.DTO;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by florian on 21/07/15.
 */
public class SearchResultDTO extends DTO {

    private List<BusinessToDisplayDTO> businesses = new ArrayList<>();
    private List<AbstractPublicationDTO> publications = new ArrayList<>();
    private List<BusinessesByCategory> categoriesMap = new ArrayList<>();

    public List<BusinessToDisplayDTO> getBusinesses() {
        return businesses;
    }

    public void setBusinesses(List<BusinessToDisplayDTO> businesses) {
        this.businesses = businesses;
    }

    public List<AbstractPublicationDTO> getPublications() {
        return publications;
    }

    public void setPublications(List<AbstractPublicationDTO> publications) {
        this.publications = publications;
    }

    public List<BusinessesByCategory> getCategoriesMap() {
        return categoriesMap;
    }

    public void setCategoriesMap(List<BusinessesByCategory> categoriesMap) {
        this.categoriesMap = categoriesMap;
    }

    public static class BusinessesByCategory {
        BusinessCategoryFlatDTO category;
        List<BusinessToDisplayDTO> businesses;

        public BusinessesByCategory(BusinessCategoryFlatDTO category, List<BusinessToDisplayDTO> businesses) {
            this.category = category;
            this.businesses = businesses;
        }

        public BusinessCategoryFlatDTO getCategory() {
            return category;
        }

        public void setCategory(BusinessCategoryFlatDTO category) {
            this.category = category;
        }

        public List<BusinessToDisplayDTO> getBusinesses() {
            return businesses;
        }

        public void setBusinesses(List<BusinessToDisplayDTO> businesses) {
            this.businesses = businesses;
        }
    }
}
