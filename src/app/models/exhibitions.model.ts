import { Category } from "./category.model";
import { Floor } from "./floor.model";
import { Review } from "./review.model";

export interface Exhibition {
    id: number;
    name: string;
    description: string;
    image: any;
    startDate: Date;
    endDate: Date;
    maxPerson: number;
    avgRating: number;
    floorId: number;
    floor: Floor;
    categories: Category[];
    reviews: Review[];
    isDeleted: boolean;
}
