insert into role (version, name) values (0,'ADMINISTRATOR');
insert into role (version, name) values (0,'USER');
insert into user (version, login, email, password_hash, role_id) values (0,'admin','admin@admin.pl','123',1);