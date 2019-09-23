insert into role (version, name) values (0,'ADMINISTRATOR');
insert into role (version, name) values (0,'USER');

insert into user (version, login, email, password_hash, role_id) values (0,'admin','admin@admin.pl','$2a$10$0Iu3Y/URm21pcr5uW5kLuenkeNSk1aOIiEeQzZ2cgSTTGCmDb3Q6e',1);
insert into user (version, login, email, password_hash, role_id) values (0,'user','user@user.pl','$2a$10$PyDUgMV3fi9bfZ/S4zBuCODOMrk5.INyOzCJLm04H30GoVm3tJJQe',2);

insert into measure (version, measure_name) values (0, 'ml');
insert into measure (version, measure_name) values (0, 'g');
insert into measure (version, measure_name) values (0, '');

insert into ingredient (version, ingredient_name, measure_id) values (0, 'flour', 2);
insert into ingredient (version, ingredient_name, measure_id) values (0, 'egg', 3);
insert into ingredient (version, ingredient_name, measure_id) values (0, 'milk', 1);
insert into ingredient (version, ingredient_name, measure_id) values (0, 'salt', 2);
insert into ingredient (version, ingredient_name, measure_id) values (0, 'butter', 2);
insert into ingredient (version, ingredient_name, measure_id) values (0, 'onion', 3);
insert into ingredient (version, ingredient_name, measure_id) values (0, 'carrot', 3);
insert into ingredient (version, ingredient_name, measure_id) values (0, 'potato', 2);
insert into ingredient (version, ingredient_name, measure_id) values (0, 'broth', 1);
insert into ingredient (version, ingredient_name, measure_id) values (0, 'champignon', 2);
insert into ingredient (version, ingredient_name, measure_id) values (0, 'parsley leaves', 2);
insert into ingredient (version, ingredient_name, measure_id) values (0, 'sour cream 18%', 1);
-- insert into ingredient (version, ingredient_name, measure_id) values (0, '', );
-- insert into ingredient (version, ingredient_name, measure_id) values (0, '', );
-- insert into ingredient (version, ingredient_name, measure_id) values (0, '', );
-- insert into ingredient (version, ingredient_name, measure_id) values (0, '', );
-- insert into ingredient (version, ingredient_name, measure_id) values (0, '', );
