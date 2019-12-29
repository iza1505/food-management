package com.sobczyk.food_management.entities;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@Entity
@Table(name = "measure")
public class MeasureEntity extends BaseEntity {

    @Column(name = "measure_name", unique = true, nullable = false, length = 50)
    private String measureName;
}
