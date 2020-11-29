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
  Tab,
  Popup,
  NavBar,
  IndexBar,
  IndexAnchor,
  Skeleton,
  Cell,
  Row,
  Col
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
  app.use(Popup);
  app.use(NavBar);
  app.use(IndexBar);
  app.use(IndexAnchor);
  app.use(Skeleton);
  app.use(Cell);
  app.use(Row);
  app.use(Col);
}
