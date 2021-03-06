
package be.lynk.server.model.entities.publication;

import be.lynk.server.model.PublicationTypeEnum;
import be.lynk.server.model.entities.Business;
import be.lynk.server.model.entities.CustomerInterest;
import be.lynk.server.model.entities.StoredFile;
import be.lynk.server.model.entities.converter.LocalDateTimePersistenceConverter;
import be.lynk.server.model.entities.technical.AbstractEntity;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by florian on 5/06/15.
 */
@Entity
public abstract class AbstractPublication extends AbstractEntity {

    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST}, optional = false, fetch = FetchType.LAZY)
    private Business business;

    @Basic(optional = false)
    private String title;

    @Basic
    @Column(columnDefinition = "text")
    private String description;

    @Basic(optional = false)
    private String searchableTitle;

    @Column(columnDefinition = "timestamp")
    @Convert(converter = LocalDateTimePersistenceConverter.class)
    @Basic(optional = false)
    protected LocalDateTime startDate;

    @Column(columnDefinition = "timestamp")
    @Convert(converter = LocalDateTimePersistenceConverter.class)
    @Basic(optional = false)
    protected LocalDateTime endDate;

    @OneToMany(mappedBy = "publication", cascade = {CascadeType.MERGE, CascadeType.REFRESH, CascadeType.REMOVE}, orphanRemoval = true, fetch = FetchType.LAZY)
    protected List<StoredFile> pictures = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    protected CustomerInterest interest;

    @Basic(optional = false)
    @Enumerated(value = EnumType.STRING)
    protected PublicationTypeEnum type;

    @Basic(optional = false)
    @Column(columnDefinition = "boolean default false")
    protected Boolean wasRemoved=false;

    public AbstractPublication() {
    }

    public Boolean getWasRemoved() {
        return wasRemoved;
    }

    public void setWasRemoved(Boolean wasRemoved) {
        this.wasRemoved = wasRemoved;
    }

    public PublicationTypeEnum getType() {
        return type;
    }

    public void setType(PublicationTypeEnum type) {
        this.type = type;
    }

    public CustomerInterest getInterest() {
        return interest;
    }

    public void setInterest(CustomerInterest interest) {
        this.interest = interest;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
        this.setSearchableTitle(normalize(title));
    }

    public Business getBusiness() {
        return business;
    }

    public String getSearchableTitle() {
        return searchableTitle;
    }

    public void setSearchableTitle(String searchableTitle) {
        this.searchableTitle = searchableTitle;
    }

    public void setBusiness(Business business) {
        this.business = business;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }

    public LocalDateTime getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }

    public List<StoredFile> getPictures() {
        return pictures;
    }

    public void setPictures(List<StoredFile> pictures) {
        this.pictures = pictures;
    }


}
