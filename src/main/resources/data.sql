insert into role (version, name) values (0,'ADMINISTRATOR');
insert into role (version, name) values (0,'USER');

insert into user_ (version, login, email, password_hash, role_id) values (0,'admin','admin@admin.pl','$2a$10$0Iu3Y/URm21pcr5uW5kLuenkeNSk1aOIiEeQzZ2cgSTTGCmDb3Q6e',1);
insert into user_ (version, login, email, password_hash, role_id) values (0,'user','user@user.pl','$2a$10$PyDUgMV3fi9bfZ/S4zBuCODOMrk5.INyOzCJLm04H30GoVm3tJJQe',2);

insert into measure (version, measure_name) values (0, 'ml');
insert into measure (version, measure_name) values (0, 'g');
insert into measure (version, measure_name) values (0, '');

insert into ingredient (version, ingredient_name, measure_id) values (0, 'flour', 2);
insert into ingredient (version, ingredient_name, measure_id) values (0, 'egg', 3);
insert into ingredient (version, ingredient_name, measure_id) values (0, 'milk', 1);
insert into ingredient (version, ingredient_name, measure_id) values (0, 'salt', 2);
insert into ingredient (version, ingredient_name, measure_id) values (0, 'vegetable oil', 1);
insert into ingredient (version, ingredient_name, measure_id) values (0, 'butter', 2);
insert into ingredient (version, ingredient_name, measure_id) values (0, 'onion', 3);
insert into ingredient (version, ingredient_name, measure_id) values (0, 'carrot', 3);
insert into ingredient (version, ingredient_name, measure_id) values (0, 'potato', 2);
insert into ingredient (version, ingredient_name, measure_id) values (0, 'broth', 1);
insert into ingredient (version, ingredient_name, measure_id) values (0, 'champignon', 2);
insert into ingredient (version, ingredient_name, measure_id) values (0, 'parsley leaves', 2);
insert into ingredient (version, ingredient_name, measure_id) values (0, 'sour cream 18%', 1);

insert into user_ingredient (version, user_id, ingredient_id, amount) values (0, 2, 1, 250);
insert into user_ingredient (version, user_id, ingredient_id, amount) values (0, 2, 2, 2);
insert into user_ingredient (version, user_id, ingredient_id, amount) values (0, 2, 3, 250);
insert into user_ingredient (version, user_id, ingredient_id, amount) values (0, 2, 4, 3);
insert into user_ingredient (version, user_id, ingredient_id, amount) values (0, 2, 5, 50);

insert into recipe (version, title, preparation_mins, description, active, waiting_for_accept, user_id) values (0,'nalesniki',30, 'opis nalesnikow',0,1,1);
--insert into recipe (title, preparation_mins, description, active, waitingForAccept) values ('nalesniki',30, 'opis nalesnikow',0,1);

insert into recipe_ingredient (version, recipe_id, ingredient_id, amount) values (0,1,1,250);
insert into recipe_ingredient (version, recipe_id, ingredient_id, amount) values (0,1,2,2);
insert into recipe_ingredient (version, recipe_id, ingredient_id, amount) values (0,1,3,250);
insert into recipe_ingredient (version, recipe_id, ingredient_id, amount) values (0,1,4,3);
insert into recipe_ingredient (version, recipe_id, ingredient_id, amount) values (0,1,5,50);
--insert into user_ingredient (version, user_id, ingredient_id, amount) values (0, 2, 3, 5);
-- insert into ingredient (version, ingredient_name, measure_id) values (0, '', );
-- insert into ingredient (version, ingredient_name, measure_id) values (0, '', );
-- insert into ingredient (version, ingredient_name, measure_id) values (0, '', );
-- insert into ingredient (version, ingredient_name, measure_id) values (0, '', );
-- insert into ingredient (version, ingredient_name, measure_id) values (0, '', );
