import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="py-16 bg-surface/50">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-text mb-4">
              About Me
            </h1>
            <p className="text-xl text-text-muted">
              Designer, developer, and creative thinker
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Bio */}
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h2 className="font-heading text-2xl font-bold text-text mb-4">
                    Hello, I'm Your Name
                  </h2>
                  <div className="prose prose-lg max-w-none text-text-muted leading-relaxed">
                    <p className="text-lg mb-4">
                      I'm a designer and developer passionate about creating meaningful digital experiences.
                      With a background in both design and engineering, I bridge the gap between aesthetics
                      and functionality.
                    </p>
                    <p>
                      This blog is my creative space where I share thoughts on design, code, and the
                      intersection of technology and creativity. I believe in the power of thoughtful design
                      to transform how we interact with the digital world.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="font-heading text-2xl font-bold text-text mb-4">
                    What I Do
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      {
                        title: "Product Design",
                        description: "Creating intuitive and beautiful user interfaces",
                        icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z",
                      },
                      {
                        title: "Frontend Development",
                        description: "Building responsive and performant web applications",
                        icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
                      },
                      {
                        title: "Creative Writing",
                        description: "Sharing insights and stories about technology and design",
                        icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
                      },
                      {
                        title: "Consulting",
                        description: "Helping teams improve their design and development processes",
                        icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
                      },
                    ].map((item) => (
                      <Card key={item.title} variant="flat" className="hover:shadow-md transition-all duration-200">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                              <svg
                                className="w-6 h-6 text-primary"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d={item.icon}
                                />
                              </svg>
                            </div>
                            <div>
                              <h3 className="font-heading font-semibold text-text mb-1">
                                {item.title}
                              </h3>
                              <p className="text-sm text-text-muted">{item.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Profile Card */}
                <Card variant="elevated">
                  <div className="p-6">
                    <div className="relative w-32 h-32 mx-auto mb-4">
                      {/* Decorative background */}
                      <svg
                        className="absolute inset-0 w-full h-full text-primary/20"
                        viewBox="0 0 128 128"
                        fill="none"
                      >
                        <circle
                          cx="64"
                          cy="64"
                          r="56"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <circle
                          cx="64"
                          cy="64"
                          r="48"
                          stroke="currentColor"
                          strokeWidth="1"
                        />
                      </svg>
                      {/* Profile icon */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                          className="w-16 h-16 text-primary"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                    </div>
                    <h3 className="font-heading text-xl font-bold text-text text-center mb-2">
                      Your Name
                    </h3>
                    <p className="text-sm text-text-muted text-center mb-4">
                      Designer & Developer
                    </p>
                    <div className="flex justify-center gap-2">
                      {["Twitter", "GitHub", "LinkedIn"].map((social) => (
                        <a
                          key={social}
                          href="#"
                          className="w-10 h-10 rounded-lg bg-border-light flex items-center justify-center text-text-muted hover:bg-primary hover:text-white transition-all duration-200"
                          aria-label={social}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                            />
                          </svg>
                        </a>
                      ))}
                    </div>
                  </div>
                </Card>

                {/* Skills */}
                <Card variant="flat">
                  <CardHeader>
                    <CardTitle className="text-lg">Skills & Tools</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "React",
                        "Next.js",
                        "TypeScript",
                        "Tailwind CSS",
                        "Figma",
                        "Node.js",
                        "UI Design",
                        "UX Research",
                      ].map((skill) => (
                        <span
                          key={skill}
                          className="inline-block px-3 py-1 text-sm rounded-full bg-accent/20 text-accent"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* CTA */}
                <Card variant="flat" className="bg-primary/5 border-primary/20">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-heading font-semibold text-text mb-2">
                      Let's Connect
                    </h3>
                    <p className="text-sm text-text-muted mb-4">
                      Have a project in mind? Let's talk!
                    </p>
                    <Button size="sm" fullWidth>
                      Get in Touch
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
