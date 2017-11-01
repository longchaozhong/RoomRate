select * from room order by code;
select  distinct room_id from dynamic_data order by room_id;
SELECT @@sql_mode;

SET sql_mode='NO_BACKSLASH_ESCAPES';

select * from detail_urls  order by href;