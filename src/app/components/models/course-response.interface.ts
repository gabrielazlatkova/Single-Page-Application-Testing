export interface CourseResponse{
  id?: number;
  title: string;
  image: string;
  additionalDetails: AdditionalDetails;
}
export interface AdditionalDetails{
  courseCode: number;
  description: string;


}
