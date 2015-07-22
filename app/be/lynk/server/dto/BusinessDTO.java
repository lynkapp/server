package be.lynk.server.dto;

import be.lynk.server.controller.technical.businessStatus.BusinessStatus;
import be.lynk.server.dto.technical.DTO;
import be.lynk.server.util.constants.ValidationRegex;
import play.modules.mongodb.jackson.KeyTyped;

import javax.persistence.Basic;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.util.*;

/**
 */
public class BusinessDTO extends DTO implements KeyTyped<Date> {

    private Long id;

    @NotNull(message = "--.validation.dto.notNull")
    @Size(min = 2, max = 250, message = "--.validation.dto.size")
    private String name;

    @NotNull(message = "--.validation.dto.notNull")
    @Size(min = 2, max = 1500, message = "--.validation.dto.size")
    private String description;

    @NotNull(message = "--.validation.dto.notNull")
    @Pattern(regexp = ValidationRegex.PHONE, message = "--.validation.dto.phone")
    private String phone;

    @Pattern(regexp = ValidationRegex.EMAIL_OR_NULL, message = "--.validation.dto.email")
    private String email;

    @Pattern(regexp = ValidationRegex.URL_OR_NULL, message = "--.validation.dto.url")
    private String website;

    private AddressDTO address;

    private StoredFileDTO illustration;

    private StoredFileDTO landscape;

    private Map<DayOfWeek, List<BusinessSchedulePartDTO>> schedules = new HashMap<>();

    private Integer totalFollowers;

    private List<BusinessCategoryDTO> businessCategories = new ArrayList<>();

    private BusinessStatus businessStatus;

    protected Date askPublicationDate;

    private String facebookLink;

    private String twitterLink;

    private String foursquareLink;

    private String googleplusLink;

    public Date getAskPublicationDate() {
        return askPublicationDate;
    }

    public void setAskPublicationDate(Date askPublicationDate) {
        this.askPublicationDate = askPublicationDate;
    }

    public BusinessDTO() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BusinessStatus getBusinessStatus() {
        return businessStatus;
    }

    public void setBusinessStatus(BusinessStatus businessStatus) {
        this.businessStatus = businessStatus;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public StoredFileDTO getLandscape() {
        return landscape;
    }

    public void setLandscape(StoredFileDTO landscape) {
        this.landscape = landscape;
    }

    public Integer getTotalFollowers() {
        return totalFollowers;
    }

    public void setTotalFollowers(Integer totalFollowers) {
        this.totalFollowers = totalFollowers;
    }

    public Map<DayOfWeek, List<BusinessSchedulePartDTO>> getSchedules() {
        return schedules;
    }

    public void setSchedules(Map<DayOfWeek, List<BusinessSchedulePartDTO>> schedules) {
        this.schedules = schedules;
    }

    public StoredFileDTO getIllustration() {
        return illustration;
    }

    public void setIllustration(StoredFileDTO illustration) {
        this.illustration = illustration;
    }

    public List<BusinessCategoryDTO> getBusinessCategories() {
        return businessCategories;
    }

    public void setBusinessCategories(List<BusinessCategoryDTO> businessCategories) {
        this.businessCategories = businessCategories;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public AddressDTO getAddress() {
        return address;
    }

    public void setAddress(AddressDTO address) {
        this.address = address;
    }

    public String getFacebookLink() {
        return facebookLink;
    }

    public void setFacebookLink(String facebookLink) {
        this.facebookLink = facebookLink;
    }

    public String getTwitterLink() {
        return twitterLink;
    }

    public void setTwitterLink(String twitterLink) {
        this.twitterLink = twitterLink;
    }

    public String getFoursquareLink() {
        return foursquareLink;
    }

    public void setFoursquareLink(String foursquareLink) {
        this.foursquareLink = foursquareLink;
    }

    public String getGoogleplusLink() {
        return googleplusLink;
    }

    public void setGoogleplusLink(String googleplusLink) {
        this.googleplusLink = googleplusLink;
    }

    @Override
    public String toString() {
        return "BusinessDTO{" +
                "name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", phone='" + phone + '\'' +
                ", address=" + address +
                ", illustration=" + illustration +
                ", businessCategories=" + businessCategories +
                '}';
    }
}
