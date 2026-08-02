export type ProfileMode = 'owner' | 'viewer';

export interface ProfileIdentity {
  id: string;
  displayName: string;
  username: string;
  bio: string;
  verified: boolean;
  status: string;
  followers: number;
  following: number;
  contributionLevel: string;
  favoriteTopics: string[];
  joinedAt: string;
  isFollowing?: boolean;
}

export interface ProfileMetric {
  id: string;
  label: string;
  value: string;
  detail: string;
}

export interface ProfileMemory {
  id: string;
  title: string;
  detail: string;
  kind: 'moment' | 'highlight' | 'note' | 'bookmark';
}

export interface ProfileCollection {
  id: string;
  title: string;
  description: string;
  count: number;
  accent: string;
}

export interface ProfileActivityItem {
  id: string;
  label: string;
  value: string;
  detail: string;
}

export interface ProfileContributionItem {
  id: string;
  label: string;
  description: string;
}

export interface ProfileSocialGroup {
  id: string;
  title: string;
  items: string[];
}

export interface ProfileContentItem {
  id: string;
  title: string;
  subtitle: string;
  meta: string;
}

export interface ProfileJourneyCard {
  id: string;
  title: string;
  subtitle: string;
  detail: string;
  type: 'listening' | 'watching' | 'audiobook';
  progress: number;
}

export interface ProfileFavoriteItem {
  id: string;
  title: string;
  detail: string;
  meta: string;
}

export interface ProfileFavoriteCollection {
  id: string;
  title: string;
  description: string;
  meta: string;
  items: ProfileFavoriteItem[];
}

export interface ProfileAchievement {
  id: string;
  title: string;
  subtitle: string;
  detail: string;
  tag: string;
}

export interface ProfileCollectionLink {
  id: string;
  title: string;
  subtitle: string;
  count: string;
}

export interface ProfileExperienceData {
  profile: ProfileIdentity;
  stats: ProfileMetric[];
  memories: ProfileMemory[];
  collections: ProfileCollection[];
  activities: ProfileActivityItem[];
  contributions: ProfileContributionItem[];
  socialGroups: ProfileSocialGroup[];
  interests: string[];
  favorites: ProfileFavoriteCollection[];
  achievements: ProfileAchievement[];
  libraryLinks: ProfileCollectionLink[];
  creatorOverview: {
    draftCount: number;
    publishedCount: number;
    status: string;
    invitation: string;
  };
  creatorDrafts: {
    id: string;
    title: string;
    status: string;
  }[];
  creatorPublished: {
    id: string;
    title: string;
    detail: string;
  }[];
}
