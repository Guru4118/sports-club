import HeroSection from '@/components/home/HeroSection'
import StatsStrip from '@/components/home/StatsStrip'
import FeaturedTournament from '@/components/home/FeaturedTournament'
import PlayersPreview from '@/components/home/PlayersPreview'
import AchievementsSection from '@/components/home/AchievementsSection'
import MatchHighlights from '@/components/home/MatchHighlights'
import GalleryPreview from '@/components/home/GalleryPreview'
import CtaSection from '@/components/home/CtaSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsStrip />
      <FeaturedTournament />
      <MatchHighlights />
      <PlayersPreview />
      <AchievementsSection />
      <GalleryPreview />
      <CtaSection />
    </>
  )
}
