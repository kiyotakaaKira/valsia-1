"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Home, BookOpen, User, Settings, LogOut, Sparkles, Zap, Trophy, ChevronRight } from "lucide-react"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import type { User as SupabaseUser } from "@supabase/supabase-js"

const navItems = [
  { href: "/dashboard", icon: Home, label: "Dashboard", xp: 100 },
  { href: "/dashboard/journeys", icon: BookOpen, label: "My Journeys", xp: 250 },
  { href: "/dashboard/profile", icon: User, label: "Profile", xp: 50 },
  { href: "/dashboard/settings", icon: Settings, label: "Settings", xp: 25 },
]

export function DashboardSidebar({ user }: { user: SupabaseUser }) {
  const pathname = usePathname()
  const router = useRouter()
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  const handleLogout = async () => {
    const supabase = getSupabaseBrowserClient()
    if (supabase) {
      await supabase.auth.signOut()
      router.push("/")
    }
  }

  const userLevel = 7
  const currentXP = 2450
  const nextLevelXP = 3000
  const xpProgress = (currentXP / nextLevelXP) * 100

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-72 flex-col z-40">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/40 via-[#0a0a0f]/95 to-[#0a0a0f]/95 backdrop-blur-xl border-r border-purple-500/20" />

      <div className="absolute top-0 right-0 w-px h-full overflow-hidden">
        <motion.div
          className="w-full h-32 bg-gradient-to-b from-transparent via-purple-500 to-transparent"
          animate={{ y: ["-100%", "400%"] }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 flex flex-col h-full p-4">
        <div className="mb-8">
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 p-[2px]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-full h-full rounded-xl bg-[#0a0a0f] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-purple-400" />
              </div>
              <motion.div
                className="absolute w-2 h-2 bg-pink-500 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                style={{ transformOrigin: "24px 24px" }}
              />
            </motion.div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Valsia
              </span>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Zap className="w-3 h-3 text-yellow-500" />
                <span>AI Skill Platform</span>
              </div>
            </div>
          </Link>

          <motion.div
            className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-blue-500/10 backdrop-blur-sm border border-purple-500/20 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-purple-500/50 rounded-tl-2xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-pink-500/50 rounded-br-2xl" />

            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <motion.div
                    className="absolute inset-0 text-yellow-500"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Trophy className="w-5 h-5" />
                  </motion.div>
                </div>
                <span className="font-bold text-white">Level {userLevel}</span>
              </div>
              <span className="text-xs text-purple-400 font-medium">
                {currentXP.toLocaleString()} / {nextLevelXP.toLocaleString()} XP
              </span>
            </div>

            <div className="relative h-3 bg-black/40 rounded-full overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${xpProgress}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
            </div>

            <p className="text-xs text-gray-400 mt-2 text-center">{nextLevelXP - currentXP} XP to next level</p>
          </motion.div>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item, index) => {
            const isActive = pathname === item.href
            const isHovered = hoveredItem === item.href

            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Link
                  href={item.href}
                  onMouseEnter={() => setHoveredItem(item.href)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className="relative block"
                >
                  <motion.div
                    className={`relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      isActive
                        ? "bg-gradient-to-r from-purple-500/20 via-pink-500/10 to-transparent"
                        : "hover:bg-purple-500/10"
                    }`}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-r-full"
                          initial={{ opacity: 0, scaleY: 0 }}
                          animate={{ opacity: 1, scaleY: 1 }}
                          exit={{ opacity: 0, scaleY: 0 }}
                        />
                      )}
                    </AnimatePresence>

                    <div className="relative">
                      <item.icon
                        className={`w-5 h-5 transition-colors ${isActive ? "text-purple-400" : "text-gray-400"}`}
                      />
                      {isActive && (
                        <div className="absolute inset-0 blur-sm">
                          <item.icon className="w-5 h-5 text-purple-400" />
                        </div>
                      )}
                    </div>

                    <span className={`font-medium ${isActive ? "text-white" : "text-gray-400"}`}>{item.label}</span>

                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8, x: -10 }}
                          animate={{ opacity: 1, scale: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.8, x: -10 }}
                          className="ml-auto flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-500/20 text-xs text-purple-400"
                        >
                          <Zap className="w-3 h-3" />
                          {item.xp} XP
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <ChevronRight
                      className={`w-4 h-4 ml-auto transition-all ${
                        isActive ? "text-purple-400 opacity-100" : "text-gray-400 opacity-0 group-hover:opacity-100"
                      }`}
                    />
                  </motion.div>
                </Link>
              </motion.div>
            )
          })}
        </nav>

        <motion.div
          className="mt-auto pt-4 border-t border-purple-500/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-blue-500/10 backdrop-blur-sm border border-purple-500/20 mb-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 p-[2px]">
                <div className="w-full h-full rounded-full bg-[#0a0a0f] flex items-center justify-center">
                  <span className="text-sm font-bold text-white">{user.email?.charAt(0).toUpperCase() || "U"}</span>
                </div>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0a0a0f]" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user.user_metadata?.name || user.email?.split("@")[0] || "Player"}
              </p>
              <p className="text-xs text-gray-400 truncate">{user.email}</p>
            </div>
          </div>

          <motion.button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-all group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <LogOut className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            <span className="font-medium">Logout</span>
          </motion.button>
        </motion.div>
      </div>
    </aside>
  )
}
