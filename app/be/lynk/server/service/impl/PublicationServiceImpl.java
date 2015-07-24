package be.lynk.server.service.impl;

import be.lynk.server.controller.technical.businessStatus.BusinessStatus;
import be.lynk.server.model.entities.Business;
import be.lynk.server.model.entities.publication.AbstractPublication;
import be.lynk.server.service.PublicationService;
import org.springframework.stereotype.Service;
import play.db.jpa.JPA;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Root;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by florian on 5/06/15.
 */
@Service
public class PublicationServiceImpl extends CrudServiceImpl<AbstractPublication> implements PublicationService {

    @Override
    public List<AbstractPublication> findActivePublication() {

        LocalDateTime now = LocalDateTime.now();

        CriteriaBuilder cb = JPA.em().getCriteriaBuilder();
        CriteriaQuery<AbstractPublication> cq = cb.createQuery(AbstractPublication.class);
        Root<AbstractPublication> from = cq.from(AbstractPublication.class);
        Path<Business> business = from.get("business");
        cq.select(from);
        cq.where(cb.lessThan(from.get("startDate"), now),
                cb.greaterThan(from.get("endDate"), now),
                cb.equal(business.get("businessStatus"), BusinessStatus.PUBLISHED));

        List<AbstractPublication> resultList = JPA.em().createQuery(cq).getResultList();
        return resultList;
    }

    @Override
    public AbstractPublication findLastPublication(Business business) {
        LocalDateTime now = LocalDateTime.now();
        CriteriaBuilder cb = JPA.em().getCriteriaBuilder();
        CriteriaQuery<AbstractPublication> cq = cb.createQuery(AbstractPublication.class);
        Root<AbstractPublication> from = cq.from(AbstractPublication.class);

        cq.select(from);
        cq.where(cb.lessThan(from.get("startDate"), now),
                cb.greaterThan(from.get("endDate"), now));
        cq.orderBy(cb.desc(from.get("startDate")));
        return getFirstResultOrNull(cq);
    }

    @Override
    public List<AbstractPublication> findActivePublicationByBusinesses(List<Business> business) {

        if (business.size() == 0) {
            return new ArrayList<>();
        }

        String request = "select p from AbstractPublication p where startDate <:now and endDate >:now and business in :businesses and business.businessStatus = :businessStatus";
        return JPA.em().createQuery(request)
                .setParameter("now", LocalDateTime.now())
                .setParameter("businesses", business)
                .setParameter("businessStatus", BusinessStatus.PUBLISHED)
                .getResultList();

//        LocalDateTime now = LocalDateTime.now();
//
//        CriteriaBuilder cb = JPA.em().getCriteriaBuilder();
//        CriteriaQuery<AbstractPublication> cq = cb.createQuery(AbstractPublication.class);
//        Root<AbstractPublication> from = cq.from(AbstractPublication.class);
//        Path<Business> business = from.get("business");
//        cq.select(from);
//        cq.where(cb.lessThan(from.get("startDate"), now));
//        cq.where(cb.greaterThan(from.get("endDate"), now));
//        cq.where(cb.in(from.get("business"),byAccount));
//        List<AbstractPublication> resultList = JPA.em().createQuery(cq).getResultList();
//        return resultList;
    }

    @Override
    public List<AbstractPublication> search(String criteria, int max) {

        criteria = normalizeForSearch(criteria);

        CriteriaBuilder cb = JPA.em().getCriteriaBuilder();
        CriteriaQuery<AbstractPublication> cq = cb.createQuery(AbstractPublication.class);
        Root<AbstractPublication> from = cq.from(AbstractPublication.class);
        Path<Business> business = from.get("business");
        cq.select(from);
        cq.where(cb.like(from.get("searchableTitle"), criteria)
                , cb.lessThan(from.get("startDate"), LocalDateTime.now())
                , cb.greaterThan(from.get("endDate"), LocalDateTime.now())
                , cb.equal(business.get("businessStatus"), BusinessStatus.PUBLISHED)
        );

        return JPA.em().createQuery(cq)
                .setMaxResults(max)
                .getResultList();
    }
}
