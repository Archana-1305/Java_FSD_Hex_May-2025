package com.hex.codingchallenge.dto;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;

import com.hex.codingchallenge.model.MedicalHistory;

@Component
public class MedicalHistoryDto {
	private String illness;
	private String medication;

	public String getIllness() {
		return illness;
	}

	public void setIllness(String illness) {
		this.illness = illness;
	}

	public String getMedication() {
		return medication;
	}

	public void setMedication(String medication) {
		this.medication = medication;
	}

	public List<MedicalHistoryDto> convertToDto(List<MedicalHistory> list) {
		List<MedicalHistoryDto> dtoList = new ArrayList<>();
		for (MedicalHistory mh : list) {
			MedicalHistoryDto dto = new MedicalHistoryDto();
			dto.setIllness(mh.getIllness());
			dto.setMedication(mh.getCurrent_medication());
			dtoList.add(dto);
		}
		return dtoList;
	}

}
