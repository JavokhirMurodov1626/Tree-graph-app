export class TreeNodeModel {
  title: string;
  id: string;
  nodeChildren: TreeNodeModel[];

  constructor(title: string, children: TreeNodeModel[]) {
    this.title = title;
    this.id = new Date().toISOString();
    this.nodeChildren = children;
  }
}

