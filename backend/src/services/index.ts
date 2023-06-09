import { Application } from '@/declarations';
import users from './users/users.service';
import boards from './boards/boards.service';
import lists from './lists/lists.service';
import tasks from './tasks/tasks.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application): void {
  app.configure(users);
  app.configure(boards);
  app.configure(lists);
  app.configure(tasks);
}
