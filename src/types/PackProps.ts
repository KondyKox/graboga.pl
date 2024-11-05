interface PackProps {
  storeData: {
    pack_name: string;
    pack_img: string;
    pack_description: string;
    pack_cost: number;
    discount?: number;
    timeRemaining?: string;
  };
}

export default PackProps;
