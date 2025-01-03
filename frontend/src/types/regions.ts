interface BoundingBox {
  top_row: number;
  left_col: number;
  bottom_row: number;
  right_col: number;
}

export interface Props {
  imageUrl: string;
  regions: { region_info: { bounding_box: BoundingBox } }[];
}
