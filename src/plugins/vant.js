import {
  Button,
  Tabbar,
  TabbarItem,
  Swipe,
  SwipeItem,
  Image,
  Tabs,
  List,
  Tag,
  Divider,
  Tab
} from 'vant';
import 'vant/lib/index.css';

export default function initVant(app) {
  app.use(Button);
  app.use(Image);
  app.use(Tabbar);
  app.use(TabbarItem);
  app.use(Swipe);
  app.use(SwipeItem);
  app.use(Tabs);
  app.use(List);
  app.use(Divider);
  app.use(Tag);
  app.use(Tab);
}
