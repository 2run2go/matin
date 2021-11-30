import React from "react";

import { SidebarItemsType } from "../../types/sidebar";
import SidebarNavList from "./SidebarNavList";

type SidebarNavSectionProps = {
  className?: Element;
  component?: React.ElementType;
  pages: SidebarItemsType[];
  title?: string;
};

const SidebarNavSection: React.FC<SidebarNavSectionProps> = (props) => {
  const {
    title,
    pages,
    className,
    component: Component = "nav",
    ...rest
  } = props;

  return (
    <Component {...rest}>
      {/*{title && <Title variant="subtitle2">{title}</Title>}*/}
      <SidebarNavList pages={pages} depth={0} />
    </Component>
  );
};

export default SidebarNavSection;
