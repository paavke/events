package com.eventure.participant.controller;

import com.eventure.participant.dto.ParticipantDTO;
import com.eventure.participant.mapper.ParticipantMapper;
import com.eventure.participant.service.ParticipantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/participants")
public class ParticipantController {

    @Autowired
    private ParticipantService participantService;

    @GetMapping
    public List<ParticipantDTO> getAllParticipants() {
        return participantService.getAllParticipants().stream()
                .map(ParticipantMapper::toDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ParticipantDTO getParticipantById(@PathVariable String id) {
        return participantService.getParticipantById(id)
                .map(ParticipantMapper::toDTO)
                .orElse(null);
    }

    @GetMapping("/event/{eventId}")
    public List<ParticipantDTO> getParticipantsByEventId(@PathVariable String eventId) {
        return participantService.getParticipantsByEventId(eventId).stream()
                .map(ParticipantMapper::toDTO)
                .collect(Collectors.toList());
    }

    @PostMapping
    public ParticipantDTO createParticipant(@RequestBody ParticipantDTO participantDTO) {
        return ParticipantMapper.toDTO(participantService.createParticipant(ParticipantMapper.toEntity(participantDTO)));
    }

    @PutMapping("/{id}")
    public ParticipantDTO updateParticipant(@PathVariable String id, @RequestBody ParticipantDTO participantDTO) {
        return ParticipantMapper.toDTO(participantService.updateParticipant(id, ParticipantMapper.toEntity(participantDTO)));
    }

    @DeleteMapping("/{id}")
    public void deleteParticipant(@PathVariable String id) {
        participantService.deleteParticipant(id);
    }
}
