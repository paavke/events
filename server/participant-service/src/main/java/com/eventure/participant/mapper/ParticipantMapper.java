package com.eventure.participant.mapper;

import com.eventure.participant.dto.ParticipantDTO;
import com.eventure.participant.model.Participant;

public class ParticipantMapper {

    public static ParticipantDTO toDTO(Participant participant) {
        ParticipantDTO dto = new ParticipantDTO();
        dto.setId(participant.getId());
        dto.setUserId(participant.getUserId());
        dto.setEventId(participant.getEventId());
        dto.setRole(participant.getRole());
        return dto;
    }

    public static Participant toEntity(ParticipantDTO dto) {
        Participant participant = new Participant();
        participant.setId(dto.getId());
        participant.setUserId(dto.getUserId());
        participant.setEventId(dto.getEventId());
        participant.setRole(dto.getRole());
        return participant;
    }
}
