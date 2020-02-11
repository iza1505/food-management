insert into role (version, name) values (0,'ADMINISTRATOR');
insert into role (version, name) values (0,'USER');
insert into role (version, name) values (0,'MANAGER');

insert into user_ (version, login, email, password_hash, role_id, active, confirmation_date,creator_login ) values (0,'admin','admin@admin.pl','$2a$10$0Iu3Y/URm21pcr5uW5kLuenkeNSk1aOIiEeQzZ2cgSTTGCmDb3Q6e',1, true , '2020-01-01 01:01:00.00000',null);
insert into user_ (version, login, email, password_hash, role_id, active, confirmation_date,creator_login ) values (0,'user','user@user.pl','$2a$10$PyDUgMV3fi9bfZ/S4zBuCODOMrk5.INyOzCJLm04H30GoVm3tJJQe',2, true, '2020-01-01 01:01:00.00000',null);
insert into user_ (version, login, email, password_hash, role_id, active, confirmation_date,creator_login ) values (0,'manager','manager@manager.pl','$2a$10$m6gJ12bV5A4jaH4fyvoJv.sK3caLrjJ2XlQny6QhN3K9cwBQsVTjy',3, true , '2020-01-01 01:01:00.00000',null);

insert into measure (version, measure_name) values (0, 'ml');
insert into measure (version, measure_name) values (0, 'g');
insert into measure (version, measure_name) values (0, '');

insert into ingredient (version, ingredient_name, measure_id, active) values (0, 'mąka', 2, true ); --1
insert into ingredient (version, ingredient_name, measure_id, active) values (0, 'jajko', 3, true );
insert into ingredient (version, ingredient_name, measure_id, active) values (0, 'mleko', 1, true);
insert into ingredient (version, ingredient_name, measure_id, active) values (0, 'sól', 2, true);
insert into ingredient (version, ingredient_name, measure_id, active) values (0, 'olej roślinny', 1, true);
insert into ingredient (version, ingredient_name, measure_id, active) values (0, 'masło', 2, true);
insert into ingredient (version, ingredient_name, measure_id, active) values (0, 'cebula', 3, true);
insert into ingredient (version, ingredient_name, measure_id, active) values (0, 'marchew', 3, true);
insert into ingredient (version, ingredient_name, measure_id, active) values (0, 'ziemniak', 2, true);
insert into ingredient (version, ingredient_name, measure_id, active) values (0, 'brokuł', 1, true); --10
insert into ingredient (version, ingredient_name, measure_id, active) values (0, 'pieczarki', 2, true);
insert into ingredient (version, ingredient_name, measure_id, active) values (0, 'liście pietruszki', 2, true);
insert into ingredient (version, ingredient_name, measure_id, active) values (0, 'kwaśna śmietana 18%', 1, true);
insert into ingredient (version, ingredient_name, measure_id, active) values (0, 'pieprz', 2, true);

-- insert into ingredient (version, ingredient_name, measure_id) values (0, '', );

insert into user_ingredient (version, user_id, ingredient_id, amount) values (0, 2, 1, 25);
insert into user_ingredient (version, user_id, ingredient_id, amount) values (0, 2, 2, 2);
insert into user_ingredient (version, user_id, ingredient_id, amount) values (0, 2, 3, 250);
insert into user_ingredient (version, user_id, ingredient_id, amount) values (0, 2, 4, 3);
--insert into user_ingredient (version, user_id, ingredient_id, amount) values (0, 2, 5, 50);

insert into recipe (version, title, preparation_mins, description, active, waiting_for_accept, user_id, to_improve) values (0,'Naleśniki',30, 'Wrzuć do miski wszystkie składniki. Następnie zmieszaj na gładką masę. Smaż po obu stronach do uzyskania pożądanego koloru.',1,0,2, '');
insert into recipe_ingredient (version, recipe_id, ingredient_id, amount) values (0,1,1,250);
insert into recipe_ingredient (version, recipe_id, ingredient_id, amount) values (0,1,2,2);
insert into recipe_ingredient (version, recipe_id, ingredient_id, amount) values (0,1,3,250);
insert into recipe_ingredient (version, recipe_id, ingredient_id, amount) values (0,1,4,3);
insert into recipe_ingredient (version, recipe_id, ingredient_id, amount) values (0,1,5,50);

insert into recipe (version, title, preparation_mins, description, active, waiting_for_accept, user_id, to_improve) values (0,'Jajecznica',15, 'Rozgrzej masło na patelni. Wbij jajka i mieszaj. Na koniec dodaj sól i pieprz.',1,0,2, '');
insert into recipe_ingredient (version, recipe_id, ingredient_id, amount) values (0, 2, 2, 2);
insert into recipe_ingredient (version, recipe_id, ingredient_id, amount) values (0, 2, 4, 1);
insert into recipe_ingredient (version, recipe_id, ingredient_id, amount) values (0, 2, 14, 2);
insert into recipe_ingredient (version, recipe_id, ingredient_id, amount) values (0, 2, 6, 5);

--insert into recipe_ingredient (version, recipe_id, ingredient_id, amount) values (0, , , );


insert into recipe (version, title, preparation_mins, description, active, waiting_for_accept, user_id, to_improve) values (0,'Jajko na twardo',13, 'Zalej jajko zimną wodą w garnku. Doprowadź wodę do wrzenia i po ok. 7 minutach wyjmij jajko z garnka i zalej zimną wodą.',1,0,2, '');
insert into recipe_ingredient (version, recipe_id, ingredient_id, amount) values (0, 3, 2, 1);
insert into recipe_ingredient (version, recipe_id, ingredient_id, amount) values (0, 3, 4, 1);

--insert into recipe (version, title, preparation_mins, description, active, waiting_for_accept, user_id) values (0,'',30, '',0,0,2);
--insert into recipe_ingredient (version, recipe_id, ingredient_id, amount) values (0, , , );


--insert into user_ingredient (version, user_id, ingredient_id, amount) values (0, 2, 3, 5);
-- insert into ingredient (version, ingredient_name, measure_id) values (0, '', );
-- insert into ingredient (version, ingredient_name, measure_id) values (0, '', );
-- insert into ingredient (version, ingredient_name, measure_id) values (0, '', );
-- insert into ingredient (version, ingredient_name, measure_id) values (0, '', );
-- insert into ingredient (version, ingredient_name, measure_id) values (0, '', );
