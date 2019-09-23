insert into role (version, name) values (0,'ADMINISTRATOR');
insert into role (version, name) values (0,'USER');

insert into user (version, login, email, password_hash, role_id) values (0,'admin','admin@admin.pl','$2a$10$0Iu3Y/URm21pcr5uW5kLuenkeNSk1aOIiEeQzZ2cgSTTGCmDb3Q6e',1);
insert into user (version, login, email, password_hash, role_id) values (0,'user','user@user.pl','$2a$10$PyDUgMV3fi9bfZ/S4zBuCODOMrk5.INyOzCJLm04H30GoVm3tJJQe',2);

insert into measure (version, m_name) values (0, 'ml');
insert into measure (version, m_name) values (0, 'g');
insert into measure (version, m_name) values (0, '');