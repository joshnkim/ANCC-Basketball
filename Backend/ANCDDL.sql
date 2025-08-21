DROP PROCEDURE IF EXISTS hello_world;

CREATE PROCEDURE hello_world()
BEGIN
    SELECT 'Hello, World!' as message;
END;