select * from reservas

delete from reservas


CREATE TABLE reservas
(
  id_reserva serial NOT NULL,
  id_usuario integer,
  id_area integer,
  data_reserva date,
  id_inicio integer,
  id_fim integer,
  CONSTRAINT pk_reservas_id_reserva PRIMARY KEY (id_reserva),
  CONSTRAINT fk_reservas_id_area FOREIGN KEY (id_area)
      REFERENCES areas (id_area),
  CONSTRAINT fk_reservas_id_fim FOREIGN KEY (id_fim)
      REFERENCES horarios (id_horario),
  CONSTRAINT fk_reservas_id_inicio FOREIGN KEY (id_inicio)
      REFERENCES horarios (id_horario),
  CONSTRAINT fk_reservas_id_usuario FOREIGN KEY (id_usuario)
      REFERENCES usuarios (id_usuario)
)

CREATE TABLE convidados
(
  id_convidado serial NOT NULL,
  id_reserva integer NOT NULL,
  nome character varying(60),
  cpf integer,
  CONSTRAINT pk_convidados_id_reserva PRIMARY KEY (id_convidado, id_reserva),
  CONSTRAINT fk_convidados_id_reserva FOREIGN KEY (id_reserva)
      REFERENCES reservas (id_reserva)
      ON DELETE CASCADE
)