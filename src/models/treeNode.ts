export class TreeNodeModel {
  title: string;
  id: string;
  nodeChildren: TreeNodeModel[];
  layer:number;

  constructor(title: string, children: TreeNodeModel[],layer:number) {
    this.title = title;
    this.id = new Date().toISOString();
    this.nodeChildren = children;
    this.layer=layer;
  }
}

