package com.food_management.repositories;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@NoRepositoryBean
@Transactional(propagation = Propagation.MANDATORY)
public interface MyJpaRepository <T, ID> extends JpaRepository<T, ID> {
    @Override
    List<T> findAll();

    @Override
    List<T> findAll(Sort sort);

    @Override
    Page<T> findAll(Pageable pageable);

    @Override
    List<T> findAllById(Iterable<ID> ids);

    @Override
    long count();

    @Override
    void deleteById(ID id);

    @Override
    void delete(T t);

    @Override
    void deleteAll(Iterable<? extends T> iterable);

    @Override
    void deleteAll();

    @Override
    <S extends T> S save(S s);

    @Override
    <S extends T> List<S> saveAll(Iterable<S> entities);

    @Override
    Optional<T> findById(ID id);

    @Override
    boolean existsById(ID id);

    @Override
    void flush();

    @Override
    <S extends T> S saveAndFlush(S entity);

    @Override
    void deleteInBatch(Iterable<T> entities);

    @Override
    void deleteAllInBatch();

    @Override
    T getOne(ID id);

    @Override
    <S extends T> Optional<S> findOne(Example<S> example);

    @Override
    <S extends T> List<S> findAll(Example<S> example);

    @Override
    <S extends T> List<S> findAll(Example<S> example, Sort sort);

    @Override
    <S extends T> Page<S> findAll(Example<S> example, Pageable pageable);

    @Override
    <S extends T> long count(Example<S> example);

    @Override
    <S extends T> boolean exists(Example<S> example);
}
