import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ProfilePage() {
     const [userData, setUserData] = useState(null);
     const [isEditing, setIsEditing] = useState(false);
     const [formData, setFormData] = useState({
          firstName: '',
          lastName: '',
          email: '',
          shortBio: '',
          instituteName: '',
          interests: ''
     });
     const navigate = useNavigate();

     useEffect(() => {
          fetchUserData();
     }, []);

     const fetchUserData = async () => {
          try {
               const token = localStorage.getItem('token');
               const response = await axios.get('http://localhost:3000/api/v1/users/me', {
                    headers: { Authorization: `Bearer ${token}` }
               });
               setUserData(response.data.user);
               setFormData({
                    firstName: response.data.user.firstName || '',
                    lastName: response.data.user.lastName || '',
                    email: response.data.user.email || '',
                    shortBio: response.data.user.shortBio || '',
                    instituteName: response.data.user.instituteName || '',
                    interests: Array.isArray(response.data.user.interests)
                         ? response.data.user.interests.join(', ')
                         : response.data.user.interests || ''
               });
          } catch (error) {
               console.error('Error fetching user data:', error);
          }
     };

     const handleUpdate = async () => {
          try {
               const token = localStorage.getItem('token');
               await axios.put(
                    'http://localhost:3000/api/v1/users/update',
                    formData,
                    {
                         headers: { Authorization: `Bearer ${token}` }
                    }
               );
               setIsEditing(false);
               fetchUserData();
               alert('Profile updated successfully!');
          } catch (error) {
               console.error('Error updating profile:', error);
               alert('Failed to update profile');
          }
     };

     return (
          <DashboardLayout>
               <div className="max-w-4xl mx-auto space-y-6">
                    <Card className="bg-white/10 border-white/20">
                         <CardHeader className="flex flex-row items-center justify-between">
                              <CardTitle className="text-2xl font-bold text-white">Profile</CardTitle>
                              <Button
                                   onClick={() => setIsEditing(!isEditing)}
                                   variant="outline"
                                   className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                              >
                                   {isEditing ? 'Cancel' : 'Edit Profile'}
                              </Button>
                         </CardHeader>
                         <CardContent className="space-y-6">
                              {isEditing ? (
                                   // Edit Form
                                   <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                             <div className="space-y-2">
                                                  <Label className="text-white">First Name</Label>
                                                  <Input
                                                       value={formData.firstName}
                                                       onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                       className="bg-white/5 border-white/10 text-white"
                                                  />
                                             </div>
                                             <div className="space-y-2">
                                                  <Label className="text-white">Last Name</Label>
                                                  <Input
                                                       value={formData.lastName}
                                                       onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                       className="bg-white/5 border-white/10 text-white"
                                                  />
                                             </div>
                                        </div>

                                        <div className="space-y-2">
                                             <Label className="text-white">Email</Label>
                                             <Input
                                                  value={formData.email}
                                                  disabled
                                                  className="bg-white/5 border-white/10 text-white/60"
                                             />
                                        </div>

                                        <div className="space-y-2">
                                             <Label className="text-white">Short Bio</Label>
                                             <Textarea
                                                  value={formData.shortBio}
                                                  onChange={(e) => setFormData({ ...formData, shortBio: e.target.value })}
                                                  className="bg-white/5 border-white/10 text-white"
                                                  rows={4}
                                             />
                                        </div>

                                        <div className="space-y-2">
                                             <Label className="text-white">Institute Name</Label>
                                             <Input
                                                  value={formData.instituteName}
                                                  onChange={(e) => setFormData({ ...formData, instituteName: e.target.value })}
                                                  className="bg-white/5 border-white/10 text-white"
                                             />
                                        </div>

                                        <div className="space-y-2">
                                             <Label className="text-white">Research Interests</Label>
                                             <Input
                                                  value={formData.interests}
                                                  onChange={(e) => setFormData({ ...formData, interests: e.target.value })}
                                                  className="bg-white/5 border-white/10 text-white"
                                                  placeholder="Separate interests with commas"
                                             />
                                        </div>

                                        <Button
                                             onClick={handleUpdate}
                                             className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                                        >
                                             Save Changes
                                        </Button>
                                   </div>
                              ) : (
                                   // Profile View
                                   <div className="space-y-6">
                                        <div className="grid grid-cols-2 gap-4">
                                             <div>
                                                  <h3 className="text-sm text-white/60">First Name</h3>
                                                  <p className="text-white">{userData?.firstName}</p>
                                             </div>
                                             <div>
                                                  <h3 className="text-sm text-white/60">Last Name</h3>
                                                  <p className="text-white">{userData?.lastName}</p>
                                             </div>
                                        </div>

                                        <div>
                                             <h3 className="text-sm text-white/60">Email</h3>
                                             <p className="text-white">{userData?.email}</p>
                                        </div>

                                        <div>
                                             <h3 className="text-sm text-white/60">Short Bio</h3>
                                             <p className="text-white">{userData?.shortBio || 'No bio added'}</p>
                                        </div>

                                        <div>
                                             <h3 className="text-sm text-white/60">Institute</h3>
                                             <p className="text-white">{userData?.instituteName || 'Not specified'}</p>
                                        </div>

                                        <div>
                                             <h3 className="text-sm text-white/60">Research Interests</h3>
                                             <div className="flex flex-wrap gap-2 mt-2">
                                                  {userData?.interests ? (
                                                       Array.isArray(userData.interests) ?
                                                            userData.interests.map((interest, index) => (
                                                                 <span
                                                                      key={index}
                                                                      className="px-3 py-1 bg-purple-500/20 text-purple-200 rounded-full text-sm"
                                                                 >
                                                                      {interest}
                                                                 </span>
                                                            ))
                                                            : userData.interests.split(',').map((interest, index) => (
                                                                 <span
                                                                      key={index}
                                                                      className="px-3 py-1 bg-purple-500/20 text-purple-200 rounded-full text-sm"
                                                                 >
                                                                      {interest.trim()}
                                                                 </span>
                                                            ))
                                                  ) : (
                                                       <p className="text-white/60">No interests added</p>
                                                  )}
                                             </div>
                                        </div>
                                   </div>
                              )}
                         </CardContent>
                    </Card>
               </div>
          </DashboardLayout>
     );
}