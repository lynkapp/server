package be.lynk.server.mongoService.impl;

import be.lynk.server.controller.technical.security.role.RoleEnum;
import be.lynk.server.dto.admin.UserHistoryDTO;
import be.lynk.server.model.entities.Account;
import be.lynk.server.service.AccountService;
import be.lynk.server.service.AddressService;
import be.lynk.server.service.DozerService;
import be.lynk.server.service.FollowLinkService;
import com.mongodb.BasicDBObject;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import be.lynk.server.module.mongo.MongoDBOperator;
import be.lynk.server.mongoService.MongoSearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static com.mongodb.client.model.Sorts.ascending;

/**
 * Created by florian on 16/10/15.
 */
@Service
public class MongoSearchServiceImpl implements MongoSearchService {

    private final static Long[] ACCOUNT_ID_EXCLUDE_LIST = {1L, 2L, 3L, 51L, 104L, 128L};


    private final static String BY_DEFAULT = "be.lynk.server.controller.rest.SearchRestController.getByDefault";


    @Autowired
    private MongoDBOperator   mongoDBOperator;
    @Autowired
    private AccountService    accountService;
    @Autowired
    private FollowLinkService followLinkService;
    @Autowired
    private AddressService    addressService;
    @Autowired
    private DozerService      dozerService;


    @Override
    public int numberSessionsFrom(LocalDateTime localDateTime) {

        Date from = dozerService.map(localDateTime, Date.class);

        DBCursor cursor = mongoDBOperator.getDB().getCollection(BY_DEFAULT)
                .find(new BasicDBObject("$and",
                                new BasicDBObject[]{new BasicDBObject("_id", new BasicDBObject("$gt", from))
                                        , new BasicDBObject("currentAccountId", new BasicDBObject("$nin", ACCOUNT_ID_EXCLUDE_LIST))})
                );

        List<Session> sessions = new ArrayList<>();

        while (cursor.hasNext()) {
            DBObject next = cursor.next();
            Session session = new Session((Long) next.get("currentAccountId"), (String) next.get("sessionId"), (Date) next.get("_id"));
            boolean founded = false;
            for (Session session1 : sessions) {
                if (session1.sameSession(session)) {
                    founded = true;
                    break;
                }
            }
            if (!founded) {
                sessions.add(session);
            }
        }

        int sessionNb = sessions.size();
        return sessionNb;
    }

    @Override
    public List<UserHistoryDTO> generateUserHistory(LocalDateTime from) {


        List<Account> accounts = new ArrayList<>();

        if (from == null) {
            for (Account account : accountService.findByRole(RoleEnum.CUSTOMER)) {
                boolean founded = false;
                for (Long aLong : ACCOUNT_ID_EXCLUDE_LIST) {
                    if (account.getId().equals(aLong)) {
                        founded = true;
                        break;
                    }

                }
                if (!founded) {
                    accounts.add(account);
                }

            }
        } else {
            //load all session from
            DBCursor cursor = mongoDBOperator.getDB().getCollection(BY_DEFAULT)
                    .find(new BasicDBObject("$and",
                                    new BasicDBObject[]{new BasicDBObject("_id", new BasicDBObject("$gt", dozerService.map(from, Date.class)))
                                            , new BasicDBObject("currentAccountId", new BasicDBObject("$nin", ACCOUNT_ID_EXCLUDE_LIST))})
                    );

            //load account
            while (cursor.hasNext()) {
                DBObject next = cursor.next();
                if (next.get("currentAccountId") != null) {
                    Account currentAccountId = accountService.findById((Long) next.get("currentAccountId"));

                    if (currentAccountId.getRole().equals(RoleEnum.CUSTOMER)) {
                        accounts.add(currentAccountId);
                    }
                }
            }
        }


        List<UserHistoryDTO> userHistoryDTOs = new ArrayList<>();
        //load all connection request
        //registration

        //load all default

        //load
        for (Account account : accounts) {

            UserHistoryDTO userHistoryDTO = new UserHistoryDTO();
            userHistoryDTOs.add(userHistoryDTO);

            userHistoryDTO.setAccountId(account.getId());
            userHistoryDTO.setCreationDate(Date.from(account.getCreationDate().atZone(ZoneId.systemDefault()).toInstant()));
            userHistoryDTO.setFacebook(account.getFacebookCredential() != null);
            userHistoryDTO.setNbFollow(followLinkService.countByAccount(account));
            userHistoryDTO.setNbAddresses(addressService.countByAccount(account));


            DBCursor cursor = mongoDBOperator.getDB().getCollection(BY_DEFAULT)
                    .find(new BasicDBObject("$and",
                            new BasicDBObject[]{
                                    new BasicDBObject("currentAccountId", account.getId())
                                    , new BasicDBObject("currentAccountId", new BasicDBObject("$nin", ACCOUNT_ID_EXCLUDE_LIST))
                            }));


            long lastSession = Date.from(account.getCreationDate().atZone(ZoneId.systemDefault()).toInstant()).getTime();
            int nbSession = 1;

            while (cursor.hasNext()) {
                DBObject next = cursor.next();
                long visitT = ((Date) next.get("_id")).getTime();
                long t = lastSession + 3600 * 1000;
                if (t < visitT) {
                    lastSession = visitT;
                    nbSession++;
                }
            }


            userHistoryDTO.setNbSessions(nbSession);
        }

        return userHistoryDTOs;
    }

    private class Session {

        private Long   userId;
        private String sessionKey;
        private Date   date;

        public Session(Long userId, String sessionKey, Date date) {
            this.userId = userId;
            this.sessionKey = sessionKey;
            this.date = date;
        }

        public Long getUserId() {
            return userId;
        }

        public String getSessionKey() {
            return sessionKey;
        }

        public Date getDate() {
            return date;
        }

        public boolean sameSession(Session session) {
            if ((userId != null && userId.equals(session.getUserId()) ||
                    sessionKey != null && sessionKey.equals(session.getSessionKey())) &&
                    date.getTime() < session.getDate().getTime() &&
                    (date.getTime() + (1000L * 60L * 30L)) > session.getDate().getTime()) {
                return true;
            }
            return false;
        }
    }


}
