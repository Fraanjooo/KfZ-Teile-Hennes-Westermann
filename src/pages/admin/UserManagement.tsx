import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { UserPlus, UserMinus, LogOut, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  created_at: string;
  isAdmin: boolean;
}

const UserManagement = () => {
  const navigate = useNavigate();
  const { user, isAdmin, loading, signOut } = useAuth();
  const { toast } = useToast();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [actionUserId, setActionUserId] = useState<string | null>(null);
  const [actionType, setActionType] = useState<"add" | "remove" | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    if (!loading) {
      setIsCheckingAuth(false);
      if (!user || !isAdmin) {
        navigate("/admin/login", { replace: true });
      }
    }
  }, [user, isAdmin, loading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      loadUsers();
    }
  }, [user, isAdmin]);

  const loadUsers = async () => {
    setUsersLoading(true);
    
    // Lade alle Profile
    const { data: profiles, error: profilesError } = await supabase
      .from("profiles")
      .select("id, email, full_name, created_at")
      .order("created_at", { ascending: false });

    if (profilesError) {
      toast({
        variant: "destructive",
        title: "Fehler beim Laden",
        description: profilesError.message,
      });
      setUsersLoading(false);
      return;
    }

    // Lade alle Admin-Rollen
    const { data: adminRoles, error: rolesError } = await supabase
      .from("user_roles")
      .select("user_id")
      .eq("role", "admin");

    if (rolesError) {
      toast({
        variant: "destructive",
        title: "Fehler beim Laden der Rollen",
        description: rolesError.message,
      });
      setUsersLoading(false);
      return;
    }

    const adminUserIds = new Set(adminRoles?.map(r => r.user_id) || []);
    
    const usersWithRoles: UserProfile[] = (profiles || []).map(profile => ({
      ...profile,
      isAdmin: adminUserIds.has(profile.id),
    }));

    setUsers(usersWithRoles);
    setUsersLoading(false);
  };

  const handleAddAdmin = async (userId: string) => {
    const { error } = await supabase
      .from("user_roles")
      .insert({ user_id: userId, role: "admin" });

    if (error) {
      toast({
        variant: "destructive",
        title: "Fehler",
        description: error.message,
      });
    } else {
      toast({
        title: "Admin hinzugefügt",
        description: "Der Benutzer wurde zum Admin gemacht.",
      });
      loadUsers();
    }
    setActionUserId(null);
    setActionType(null);
  };

  const handleRemoveAdmin = async (userId: string) => {
    // Verhindere, dass der letzte Admin sich selbst entfernt
    if (userId === user?.id) {
      toast({
        variant: "destructive",
        title: "Fehler",
        description: "Sie können sich nicht selbst als Admin entfernen.",
      });
      setActionUserId(null);
      setActionType(null);
      return;
    }

    const { error } = await supabase
      .from("user_roles")
      .delete()
      .eq("user_id", userId)
      .eq("role", "admin");

    if (error) {
      toast({
        variant: "destructive",
        title: "Fehler",
        description: error.message,
      });
    } else {
      toast({
        title: "Admin entfernt",
        description: "Die Admin-Berechtigung wurde entfernt.",
      });
      loadUsers();
    }
    setActionUserId(null);
    setActionType(null);
  };

  if (loading || usersLoading || isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blog-background">
        <div className="text-lg text-blog-accent">Laden...</div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-blog-background">
      <header className="border-b bg-white shadow-blog">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/admin/dashboard")}
              className="text-blog-accent hover:bg-blog-accent/10"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Zurück
            </Button>
            <h1 className="text-2xl font-bold text-blog-accent">Benutzerverwaltung</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user.email}</span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={signOut}
              className="border-blog-accent text-blog-accent hover:bg-blog-accent hover:text-white"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Abmelden
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-2">Benutzer & Admins</h2>
          <p className="text-muted-foreground">
            Verwalten Sie Admin-Berechtigungen für Benutzer
          </p>
        </div>

        <div className="grid gap-4">
          {users.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                Keine Benutzer gefunden.
              </CardContent>
            </Card>
          ) : (
            users.map((userProfile) => (
              <Card key={userProfile.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <CardTitle className="mb-2">
                        {userProfile.full_name || userProfile.email}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-3">
                        <span>{userProfile.email}</span>
                        {userProfile.isAdmin && (
                          <Badge className="bg-blog-accent text-white">
                            Admin
                          </Badge>
                        )}
                        {userProfile.id === user.id && (
                          <Badge variant="outline" className="border-blog-accent text-blog-accent">
                            Sie
                          </Badge>
                        )}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      {userProfile.isAdmin ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setActionUserId(userProfile.id);
                            setActionType("remove");
                          }}
                          className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                          disabled={userProfile.id === user.id}
                        >
                          <UserMinus className="h-4 w-4 mr-2" />
                          Admin entfernen
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setActionUserId(userProfile.id);
                            setActionType("add");
                          }}
                          className="border-blog-accent text-blog-accent hover:bg-blog-accent hover:text-white"
                        >
                          <UserPlus className="h-4 w-4 mr-2" />
                          Zum Admin machen
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))
          )}
        </div>
      </main>

      <AlertDialog 
        open={!!actionUserId} 
        onOpenChange={() => {
          setActionUserId(null);
          setActionType(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {actionType === "add" ? "Admin hinzufügen?" : "Admin entfernen?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {actionType === "add"
                ? "Dieser Benutzer erhält Admin-Berechtigungen und kann alle Bereiche verwalten."
                : "Die Admin-Berechtigung wird diesem Benutzer entzogen."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Abbrechen</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (actionUserId) {
                  if (actionType === "add") {
                    handleAddAdmin(actionUserId);
                  } else {
                    handleRemoveAdmin(actionUserId);
                  }
                }
              }}
            >
              Bestätigen
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UserManagement;
