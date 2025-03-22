import { motion, AnimatePresence } from 'framer-motion'
import { FaFileAlt } from 'react-icons/fa'

interface EducationExtraInfoProps {
    isOpen: boolean;
    info: string;
    documentationPath?: string;
    documentName?: string;
    openDocumentPreview: (path: string, name: string) => void;
    title: string;
    style?: React.CSSProperties;
}

const EducationExtraInfo: React.FC<EducationExtraInfoProps> = ({ 
    isOpen,
    info, 
    documentationPath, 
    documentName, 
    openDocumentPreview,
    title,
    style
}) => {
  return (
    <AnimatePresence initial={false}>
        {isOpen && (
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                duration: 0.3,
                opacity: { duration: 0.25 }
                }}
                className="overflow-hidden"
                style={{...style}}
            >
                <div className="mt-3 text-sm text-[hsl(var(--muted-foreground)] p-3 rounded-md bg-[hsl(var(--muted))]/30">
                <p>{info}</p>
                {documentationPath && (
                    <motion.button 
                    onClick={() => openDocumentPreview(documentationPath!, documentName!)}
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary))]/90 transition-colors"
                    aria-label={`View certificate for ${title}`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    >
                    <FaFileAlt className="h-4 w-4" />
                    View Certificate
                    </motion.button>
                )}
                </div>
            </motion.div>
    )}
    </AnimatePresence>
  )
}

export default EducationExtraInfo