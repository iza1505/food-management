package com.food_management.entities;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Data
@NoArgsConstructor
@Entity
@Table(name = "measure")
public class MeasureEntity extends BaseEntity {

    @Column(name = "m_name", unique = true, nullable = false, length = 50)
    private String measureName;
}
