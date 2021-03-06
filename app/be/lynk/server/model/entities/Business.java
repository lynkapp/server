package be.lynk.server.model.entities;

import be.lynk.server.controller.technical.businessStatus.BusinessStatusEnum;
import be.lynk.server.model.entities.converter.LocalDateTimePersistenceConverter;
import be.lynk.server.model.entities.publication.AbstractPublication;
import be.lynk.server.model.entities.technical.AbstractEntity;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * Created by florian on 10/11/14.
 */
@Entity
public class Business extends AbstractEntity implements Comparable<Business> {


    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true, optional = true, fetch = FetchType.LAZY)
    private Account account;

    @Basic(optional = false)
    private String name;

    @Basic(optional = false)
    private String searchableName;

    @Basic
    @Column(columnDefinition = "text")
    private String description;

    @Basic
    private String phone;

    @Basic
    private String website;

    @Basic
    private String email;

    @Basic
    private String vta;

    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    private Address address;

    @ManyToMany
    @JoinTable(
            name = "business_category",
            joinColumns = {@JoinColumn(name = "business")},
            inverseJoinColumns = {@JoinColumn(name = "category")})
    private List<BusinessCategory> businessCategories = new ArrayList<>();

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private StoredFile illustration;

    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST}, fetch = FetchType.LAZY)
    private StoredFile landscape;

    @OneToMany(mappedBy = "business", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AbstractPublication> publications;

    @OneToMany(mappedBy = "business", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<BusinessSchedule> schedules = new ArrayList<>();

    @Basic(optional = false)
    @Enumerated(value = EnumType.STRING)
    private BusinessStatusEnum businessStatus;

    @Column(columnDefinition = "timestamp")
    @Convert(converter = LocalDateTimePersistenceConverter.class)
    private LocalDateTime lastStatusChange;

    @Column(columnDefinition = "timestamp")
    @Convert(converter = LocalDateTimePersistenceConverter.class)
    protected LocalDateTime askPublicationDate;

    @Embedded
    private BusinessSocialNetwork socialNetwork;


    @OneToMany(mappedBy = "businessGalleryPicture", cascade = CascadeType.ALL)
    private Set<StoredFile> galleryPictures = new HashSet<>();

    @OneToMany(mappedBy = "business", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<FollowLink> followLinks;

    @Basic
    private String facebookPageAccessToken;

    public Business() {
        lastStatusChange = LocalDateTime.now();
    }


    public String getFacebookPageAccessToken() {
        return facebookPageAccessToken;
    }

    public void setFacebookPageAccessToken(String facebookPageAccessToken) {
        this.facebookPageAccessToken = facebookPageAccessToken;
    }

    public Business(Account account, String name) {
        this.account = account;
        this.name = name;
        this.searchableName = normalize(name);
        businessStatus = BusinessStatusEnum.NOT_PUBLISHED;
        lastStatusChange = LocalDateTime.now();
    }

    public Set<FollowLink> getFollowLinks() {
        return followLinks;
    }

    public void setFollowLinks(Set<FollowLink> followLinks) {
        this.followLinks = followLinks;
    }

    public LocalDateTime getLastStatusChange() {
        return lastStatusChange;
    }

    public void setLastStatusChange(LocalDateTime lastStatusChange) {
        this.lastStatusChange = lastStatusChange;
    }

    public String getVta() {
        return vta;
    }

    public void setVta(String vta) {
        this.vta = vta;
    }

    public Set<StoredFile> getGalleryPictures() {
        return galleryPictures;
    }

    public void setGalleryPictures(Set<StoredFile> galleryPictures) {
        this.galleryPictures = galleryPictures;
    }

    public BusinessStatusEnum getBusinessStatus() {
        return businessStatus;
    }

    public String getSearchableName() {
        return searchableName;
    }

    public void setSearchableName(String searchableName) {
        this.searchableName = searchableName;

    }

    public LocalDateTime getAskPublicationDate() {
        return askPublicationDate;
    }

    public void setAskPublicationDate(LocalDateTime askPublicationDate) {
        this.askPublicationDate = askPublicationDate;
    }

    public void setBusinessStatus(BusinessStatusEnum businessStatus) {
        this.businessStatus = businessStatus;
        this.lastStatusChange = LocalDateTime.now();
    }

    public List<BusinessSchedule> getSchedules() {
        return schedules;
    }

    public void setSchedules(List<BusinessSchedule> businessSchedules) {
        this.schedules = businessSchedules;
    }

    public StoredFile getIllustration() {
        return illustration;
    }

    public void setIllustration(StoredFile illustration) {
        this.illustration = illustration;
    }

    public StoredFile getLandscape() {
        return landscape;
    }

    public void setLandscape(StoredFile landscape) {
        this.landscape = landscape;
    }

    public List<BusinessCategory> getBusinessCategories() {
        return businessCategories;
    }

    public void setBusinessCategories(List<BusinessCategory> businessCategories) {
        this.businessCategories = businessCategories;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
        this.searchableName = normalize(name);
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String desc) {
        this.description = desc;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public List<AbstractPublication> getPublications() {
        return publications;
    }

    public void setPublications(List<AbstractPublication> publications) {
        this.publications = publications;
    }

    public String getWebsite() {
        return website;
    }

    public void setWebsite(String website) {
        this.website = website;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public BusinessSocialNetwork getSocialNetwork() {
        return socialNetwork;
    }

    public void setSocialNetwork(BusinessSocialNetwork socialNetwork) {
        this.socialNetwork = socialNetwork;
    }

    @Override
    public String toString() {
        return "Business{" +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", phone='" + phone + '\'' +
                ", address=" + address +
                ", illustration=" + illustration +
                '}';
    }

    @Override
    public int compareTo(Business o) {
        return this.getName().compareTo(o.getName());
    }
}
