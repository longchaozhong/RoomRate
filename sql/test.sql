use room_rate;

select `code`,count(*) as count from room group by `code` having count>1;

select count(*) as total ,count(distinct code) as code from room order by id;

select * from room where code = 'U170298666786';

select count(*) from dynamic_data;


select distinct * from room right join dynamic_data on room.id = dynamic_data.room_id limit 0,10;