import { Button, Tabbar, TabbarItem } from 'vant';
import 'vant/lib/index.css';

export default function initVant(app) {
  app.use(Button);
  app.use(Tabbar);
  app.use(TabbarItem);
}
