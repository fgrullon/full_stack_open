interface CoursePartBase {
    name : string;
    exerciseCount : number;
    kind : string;
}

interface CoursePartDescription extends CoursePartBase {
    description : string;
}

interface CoursePartRequirements extends CoursePartDescription {
    requirements : string[];
    kind : 'special';
}

interface CoursePartBasic extends  CoursePartDescription {
    kind : 'basic';
}

interface CoursePartGroup extends CoursePartBase {
    groupProjectCount : number;
    kind : 'group';
}

interface CoursePartBackground extends CoursePartDescription {
    backgroundMaterial : string;
    kind : 'background';
}


type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartRequirements;

export type { CoursePart };

