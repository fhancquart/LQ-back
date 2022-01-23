import DataLoader from 'dataloader';
import { Cards_category } from '../entities/cards/Cards_category';

//number = [1, 78, 9, 3...]
//User = [{id: 1, username: tim}, {}, {}...]
export const createUserLoader = () => new DataLoader<number, Cards_category>(async (userIds) => { 

    const users = await Cards_category.findByIds(userIds as number[]); 
    const userIdToUser: Record <number, Cards_category> = {};
    users.forEach((u) => {
        userIdToUser[u.cd_userid] = u;
    });

    // console.log("xxxxxxxxxxx")

    return userIds.map((userId) => userIdToUser[userId]);
});