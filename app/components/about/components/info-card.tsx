import { Card, CardContent, CardHeader } from "@/components/ui/card";
import IconComponent from "./icon-component";
import type { IconName } from "./icon-component";
interface InfoCardProps {
    icon: string;
    title: string;
    content: string;
    iconColor: string;
  }
  
function InfoCard({ icon, title, content, iconColor }: InfoCardProps) {
return (
    <Card className="overflow-hidden transition-all duration-200 hover:shadow-lg active:shadow-md group">
    <CardHeader className={`flex items-center justify-center ${iconColor} bg-muted/30 p-2 xs:p-2.5 sm:p-3 pb-1 xs:pb-1.5 sm:pb-2 group-hover:bg-muted/50 transition-colors`}>
        <IconComponent name={icon as IconName} size={24} className="xs:w-7 xs:h-7 sm:w-8 sm:h-8 transition-transform group-hover:scale-110" />
    </CardHeader>
    <CardContent className="p-2.5 xs:p-3 sm:p-4 text-center">
        <h3 className="mb-1 xs:mb-1.5 sm:mb-2 text-sm xs:text-base sm:text-lg font-bold group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-xs xs:text-sm text-muted-foreground">{content}</p>
    </CardContent>
    </Card>
);
}

export default InfoCard;