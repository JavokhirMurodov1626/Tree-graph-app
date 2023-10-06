import styles from "./treeDiagram.module.css";
import { useEffect, useRef, useState } from "react";
import { TreeNodeModel } from "../../models/treeNode";
import TreeNode from "./treeNode";

const TreeDiagram = () => {
  const movingAreaRef = useRef<HTMLDivElement>(null);
  const rootNodeRef = useRef<HTMLDivElement>(null);

  const [rootNode, setRootNode] = useState<TreeNodeModel>(
    new TreeNodeModel("firstNode", [], 0)
  );

  const isClicked = useRef<boolean>(false);

  const coords = useRef<{
    startX: number;
    startY: number;
    lastX: number;
    lastY: number;
  }>({
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
  });

  useEffect(() => {
    if (!rootNodeRef.current || !movingAreaRef.current) return;

    const rootNode = rootNodeRef.current;
    const movingArea = movingAreaRef.current;

    const mouseDownHandler = (e: MouseEvent) => {
      isClicked.current = true;
      coords.current.startX = e.clientX;
      coords.current.startY = e.clientY;
    };

    const mouseUpHandler = (e: MouseEvent) => {
      isClicked.current = false;
      coords.current.lastX = rootNode.offsetLeft;
      coords.current.lastY = rootNode.offsetTop;
    };

    const mouseMoveHandler = (e: MouseEvent) => {
      if (!isClicked.current) return;

      const nextX = e.clientX - coords.current.startX + coords.current.lastX;
      const nextY = e.clientY - coords.current.startY + coords.current.lastY;

      const maxX = movingArea.clientWidth - rootNode.clientWidth;
      const maxY = movingArea.clientHeight - rootNode.clientHeight;

      // Ensure the rootNode stays within the boundaries
      const constrainedX = Math.max(0, Math.min(nextX, maxX));
      const constrainedY = Math.max(0, Math.min(nextY, maxY));

      rootNode.style.top = `${constrainedY}px`;
      rootNode.style.left = `${constrainedX}px`;
    };

    rootNode.addEventListener("mousedown", mouseDownHandler);
    rootNode.addEventListener("mouseup", mouseUpHandler);
    movingArea.addEventListener("mousemove", mouseMoveHandler);
    movingArea.addEventListener("mouseleave", mouseUpHandler);

    return () => {
      rootNode.removeEventListener("mousedown", mouseDownHandler);
      rootNode.removeEventListener("mouseup", mouseUpHandler);
      movingArea.removeEventListener("mousemove", mouseMoveHandler);
      movingArea.removeEventListener("mouseleave", mouseUpHandler);
    };
  }, []);

  const addChild = (parent: TreeNodeModel) => {
    const newChild = new TreeNodeModel(
      `Child ${parent.nodeChildren.length + 1}`,
      [],
      parent.layer + 1
    );

    parent.nodeChildren.push(newChild);
    setRootNode({ ...rootNode }); // Trigger a re-render
  };

  const renderNode = (node: TreeNodeModel) => {
    return (
      <TreeNode
        layer={node.layer}
        key={node.id}
        title={node.title}
        onAddChild={() => addChild(node)}
        nodeChildren={node.nodeChildren}
      >
        {node.nodeChildren.map(renderNode)}
      </TreeNode>
    );
  };
  return (
    <section ref={movingAreaRef} className={styles["tree-playground"]}>
      {/* <div className={styles["root-node-wrap"]}>
        <p className={`${styles["root-node"]} m-0`}>categories</p>
        <button className={styles["root-node__btn"]}>
          <i className="bi bi-plus-circle" style={{ fontSize: "20px" }}></i>
        </button>
      </div> */}
      <div ref={rootNodeRef} className={`${styles.tree} tree`}>
        {renderNode(rootNode)}
      </div>
    </section>
  );
};

export default TreeDiagram;
