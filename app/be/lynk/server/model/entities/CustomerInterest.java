package be.lynk.server.model.entities;

import be.lynk.server.model.entities.technical.AbstractEntity;

import javax.persistence.*;
import java.util.List;

/**
 * Created by florian on 17/05/15.
 */
@Entity
public class CustomerInterest extends AbstractEntity implements Comparable<CustomerInterest>{

    @Basic(optional = false)
    @Column(unique = true)
    private String name;

    @ManyToOne(cascade = CascadeType.ALL,optional = false,fetch = FetchType.EAGER)
    private Translation translationName;

    @Basic
    private Integer orderIndex;

    @Basic
    private String iconName;

    @OneToMany(mappedBy = "customerInterest",cascade = {CascadeType.MERGE,CascadeType.PERSIST})
    private List<CategoryInterestLink> links;

    public CustomerInterest() {
    }

    public CustomerInterest(String name, Translation translationName, Integer orderIndex) {
        this.name = name;
        this.translationName = translationName;
        this.orderIndex = orderIndex;
    }

    public String getIconName() {
        return iconName;
    }

    public void setIconName(String iconName) {
        this.iconName = iconName;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Translation getTranslationName() {
        return translationName;
    }

    public void setTranslationName(Translation translationName) {
        this.translationName = translationName;
    }

    public List<CategoryInterestLink> getLinks() {
        return links;
    }

    public void setLinks(List<CategoryInterestLink> links) {
        this.links = links;
    }

    public Integer getOrderIndex() {
        return orderIndex;
    }

    public void setOrderIndex(Integer orderIndex) {
        this.orderIndex = orderIndex;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;

        CustomerInterest that = (CustomerInterest) o;

        if (!name.equals(that.name)) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return name.hashCode();
    }

    @Override
    public String toString() {
        return "CustomerInterest{" +
                "name='" + name + '\'' +
                ", translationName='" + translationName + '\'' +
                '}';
    }

    @Override
    public int compareTo(CustomerInterest o) {
        return this.orderIndex.compareTo(o.orderIndex);
    }
}
