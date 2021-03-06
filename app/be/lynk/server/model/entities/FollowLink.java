package be.lynk.server.model.entities;

import be.lynk.server.model.entities.converter.LocalDateTimePersistenceConverter;
import be.lynk.server.model.entities.technical.AbstractEntity;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * Created by florian on 9/06/15.
 */
@Entity
@Table(uniqueConstraints=
@UniqueConstraint(columnNames = {"business_id", "account_id"}))
public class FollowLink extends AbstractEntity {

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private   Business      business;
    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    private   Account       account;
    @Column(columnDefinition = "timestamp")
    @Convert(converter = LocalDateTimePersistenceConverter.class)
    @Basic(optional = false)
    protected LocalDateTime followedFrom;
    @Basic
    private   Boolean       notification;
    @Basic(optional = false)
    @Column(columnDefinition = "boolean default true")
    private   Boolean       followingNotification;

    public FollowLink() {
    }

    public FollowLink(Business business, Account account) {
        this.business = business;
        this.account = account;
        this.followedFrom = LocalDateTime.now();
        this.followingNotification=true;
    }

    public Boolean getFollowingNotification() {
        return followingNotification;
    }

    public void setFollowingNotification(Boolean followingNotification) {
        this.followingNotification = followingNotification;
    }

    public LocalDateTime getFollowedFrom() {
        return followedFrom;
    }

    public void setFollowedFrom(LocalDateTime followedFrom) {
        this.followedFrom = followedFrom;
    }

    public Business getBusiness() {
        return business;
    }

    public void setBusiness(Business business) {
        this.business = business;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public Boolean getNotification() {
        return notification;
    }

    public void setNotification(Boolean notification) {
        this.notification = notification;
    }
}
