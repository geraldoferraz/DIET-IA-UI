import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface AnamneseSkeletonProps {
    count?: number;
}

export function AnamneseSkeleton({ count = 5 }: AnamneseSkeletonProps) {
    return (
        <div className="space-y-8">
            {[...Array(count)].map((_, i) => (
                <Card key={i} className="overflow-hidden bg-card rounded-lg">
                    <div className="border-l-4 border-l-primary/30 h-full">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <Skeleton className="h-14 w-14 rounded-full" />
                                    <div>
                                        <Skeleton className="h-5 w-32 mb-2" />
                                        <Skeleton className="h-4 w-48" />
                                    </div>
                                </div>
                                <Skeleton className="h-8 w-8 rounded-md" />
                            </div>
                            <div className="space-y-4 mb-4">
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                            <Skeleton className="h-5 w-full" />
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
}