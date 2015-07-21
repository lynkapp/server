package be.lynk.server.dto;

import be.lynk.server.dto.technical.DTO;

/**
 * Created by florian on 19/07/15.
 */
public class SearchDTO extends DTO {

    private String search;

    private PositionDTO position;

    public String getSearch() {
        return search;
    }

    public void setSearch(String search) {
        this.search = search;
    }

    public PositionDTO getPosition() {
        return position;
    }

    public void setPosition(PositionDTO position) {
        this.position = position;
    }

    @Override
    public String toString() {
        return "SearchDTO{" +
                "search='" + search + '\'' +
                "} " + super.toString();
    }
}
