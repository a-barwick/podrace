export type User = {
    id: string;
    email: string;
    name: string;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
};

export type Podcast = {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    audioUrl: string;
    duration: number;
    publishedAt: string;
};

export type Plan = {
    id?: string | null;
    user_id: string;
    title: string;
};

export type PlanItem = {
    id?: string | null;
    plan_id: string;
    user_id: string;
    content: string;
    is_done: boolean = false;
};
