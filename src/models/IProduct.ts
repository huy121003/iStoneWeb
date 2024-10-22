import { ICategories } from "./ICategories";

export interface IProduct {
    id: number;
    name: string;
    price: number;
    salePrice: number;
    shortDescription: string;
    description: string;
    slug: string;
    thumbnail: string;
    categoryId: number;
    category: ICategories;
    createdAt: string;
    updatedAt: string;
    isNew: boolean;
    isSale: boolean;
    isHot: boolean;
    category1: ICategories;
    category2: ICategories;
    __entity: string;
    category1Id: number;
    category2Id: number;
    images: string[];
    attribute: [
        {
            name: string;
            values: [
                {
                    value: string;
                    html_color: string;
                }
            ]
        }
    ]
    child: any[];
}